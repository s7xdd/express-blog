export function getNestedValue(obj: any, path: string): any {
    try {
        if (!path.includes(".")) {
            return obj[path];
        }

        return path.split(".").reduce((acc: any, part: string) => {
            const arrayMatch = part.match(/(\w+)\[(\d+)\]/);
            if (arrayMatch) {
                const [, key, index] = arrayMatch;
                return acc && acc[key] ? acc[key][parseInt(index, 10)] : undefined;
            }
            return acc && typeof acc === "object" ? acc[part] : undefined;
        }, obj);
    } catch (e) {
        return undefined;
    }
}

export function mapDataToNestedStructure(data: any, structure: any): any {
    const result: any = {};

    const topLevelObjects = new Set<string>();
    for (const path in structure) {
        if (structure.hasOwnProperty(path)) {
            const rootObj = path.split('.')[0];
            if (rootObj) {
                topLevelObjects.add(rootObj);
            }
        }
    }

    topLevelObjects.forEach(obj => {
        result[obj] = {};
    });

    const directFields = new Set<string>();
    for (const path in structure) {
        if (!path.includes('.') && !path.includes('[')) {
            directFields.add(path);
        }
    }

    for (const field in data) {
        if (!data.hasOwnProperty(field)) continue;

        const value = data[field];

        if (directFields.has(field)) {
            result[field] = value;
            continue;
        }

        let assigned = false;
        for (const rootObj of topLevelObjects) {
            for (const path in structure) {
                if (!path.startsWith(`${rootObj}.`)) continue;

                const pathSuffix = path.substring(rootObj.length + 1);

                if (pathSuffix === field) {
                    result[rootObj][field] = value;
                    assigned = true;
                    break;
                }

                const nestedPathParts = pathSuffix.split('.');
                if (nestedPathParts[0] === field && typeof value === 'object' && value !== null) {
                    result[rootObj][field] = value;
                    assigned = true;
                    break;
                }
            }

            if (assigned) break;
        }

        if (!assigned) {
            for (const rootObj of topLevelObjects) {
                const relatedPathExists = Object.keys(structure).some(path =>
                    path.startsWith(`${rootObj}.${field}`) ||
                    path.includes(`${rootObj}.${field}[`)
                );

                if (relatedPathExists) {
                    result[rootObj][field] = value;
                    assigned = true;
                    break;
                }
            }

            if (!assigned) {
                if (Array.isArray(value)) {
                    for (const rootObj of topLevelObjects) {
                        const arrayPattern = new RegExp(`${rootObj}\\.${field}\\[\\]`);
                        const hasArrayMatch = Object.keys(structure).some(path =>
                            arrayPattern.test(path) || path === `${rootObj}.${field}`
                        );

                        if (hasArrayMatch) {
                            result[rootObj][field] = value;
                            assigned = true;
                            break;
                        }
                    }
                }

                if (!assigned && topLevelObjects.size > 0) {
                    const firstObj = Array.from(topLevelObjects)[0];
                    result[firstObj][field] = value;
                }
            }
        }
    }

    for (const path in structure) {
        if (!structure.hasOwnProperty(path)) continue;

        if (path.includes('[]')) {
            const pathParts = path.split('.');
            let current = result;

            for (let i = 0; i < pathParts.length; i++) {
                const part = pathParts[i];

                if (part.includes('[]')) {
                    const arrayName = part.split('[')[0];

                    if (i < pathParts.length - 1) {
                        if (!current[arrayName]) {
                            current[arrayName] = data[arrayName] || [];
                        }

                        if (current[arrayName]) {
                            current = current[arrayName];
                        }
                    }
                } else if (current && typeof current === 'object' && i < pathParts.length - 1) {
                    if (!current[part]) {
                        current[part] = {};
                    }
                    current = current[part];
                }
            }
        }
    }

    return result;
}

export function mapDataToFormData(data: any, formData = new FormData()): FormData {
    function appendToFormData(obj: any, prefix = "") {
        if (!obj) return;

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                const fieldName = prefix ? prefix + (prefix.endsWith("]") ? `[${key}]` : `.${key}`) : key;

                if (value instanceof File || value instanceof Blob) {
                    // Directly append single file instead of using index
                    formData.append(fieldName, value);
                }
                else if (value === null || value === undefined) {
                    formData.append(fieldName, "");
                }
                else if (Array.isArray(value)) {
                    if (value.length === 0) {
                        formData.delete(fieldName);
                    } else if (value.length === 1 && (value[0] instanceof File || value[0] instanceof Blob)) {
                        // If only one file exists in array, append directly
                        formData.append(fieldName, value[0]);
                    } else {
                        // Append array elements with index
                        value.forEach((item, index) => {
                            if (item instanceof File || item instanceof Blob) {
                                formData.append(`${fieldName}[${index}]`, item);
                            }
                            else if (typeof item === 'object' && item !== null) {
                                appendToFormData(item, `${fieldName}[${index}]`);
                            }
                            else if (item === null) {
                                formData.delete(fieldName);
                            }
                            else {
                                formData.append(`${fieldName}[${index}]`, String(item));
                            }
                        });
                    }
                }
                else if (typeof value === 'object') {
                    appendToFormData(value, fieldName);
                }
                else {
                    formData.append(fieldName, String(value));
                }
            }
        }
    }

    appendToFormData(data);

    let hasEntries = false;
    for (const pair of formData.entries()) {
        hasEntries = true;
        break;
    }

    if (!hasEntries) {
        console.warn("Warning: FormData is empty after processing");
    }

    return formData;
}