import { QueryRuleProps } from "../types/common-types";

export const buildQueryFromRules = (
    queryParams: Record<string, any>,
    rules: QueryRuleProps[]
): Record<string, any> => {
    const query: Record<string, any> = {};

    for (const rule of rules) {
        const value = queryParams[rule.key];

        if (value === undefined) continue;

        const field = rule.field || rule.key;

        switch (rule.type) {
            case 'string':
                query[field] = value;
                break;

            case 'boolean':
                query[field] = value === 'true';
                break;

            case 'array':
                query[field] = { $in: value.split(',') };
                break;

            case 'regex':
                query[field] = { $regex: new RegExp(value, 'i') };
                break;

            case 'search':
                const keywordRegex = new RegExp(value, 'i');
                query['$or'] = [
                    { title: keywordRegex },
                    { content: keywordRegex },
                    { tags: keywordRegex },
                    { categories: keywordRegex },
                ];
                break;

            case 'limit':
                const limit = parseInt(value, 10) || 10;
                query.$limit = limit;
                break;

            case 'page':
                const page = parseInt(value, 10) || 1;
                const skip = (page - 1) * query.$limit;
                query.$skip = skip;
                break;
        }
    }

    return query;
};

