const FormErrorWrapper: React.FC<{ children: React.ReactNode; error?: string | string[] }> = ({ children, error }) => {
  const renderError = (error: string | string[] | undefined) => {
    if (!error) return null;

    if (typeof error === "string") {
      return <p className="text-red-500 mt-2 text-sm">{error}</p>;
    }

    if (Array.isArray(error)) {
      return error.map((msg, index) => (
        <p key={index} className="text-red-500 mt-2 text-sm">
          {msg}
        </p>
      ));
    }

    return <p className="text-red-500 mt-2 text-sm">An unexpected error occurred</p>;
  };

  return (
    <div>
      {children}
      {renderError(error)}
    </div>
  );
};
