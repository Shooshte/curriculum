'''
categories: "ReactJS;Clean Code"
date: "2022-01-24"
description: "How to write cleaner, less error-prone ReactJS Components by writing a reusable hook for handling async requests on Component mount status and a higher order component to handle status rendering."
title: "Clean-er ReactJS Code - Handling Component data loading in a predictable way."
'''

# Clean-er ReactJS Code - Reusable async requests hook"

## TL;DR

The reusable async request hook used inside a functional component.

```javascript
// Custom hook for handling request loading status
const useAsyncState = (asyncFunction = () => {}) => {
  const [responseData, setResponseData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const makeRequest = async () => {
    setIsLoading(true);

    try {
      const response = await asyncFunction();
      setResponseData(response);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return [
    {
      error,
      isLoading,
      responseData,
    },
    makeRequest,
  ];
};

// Example usage component
const PrettyComponent = () => {
  const getCatFact = async () => {
    const data = await fetch("https://catfact.ninja/fact");
    return data.json();
  };
  const [{ error, isLoading, responseData }, makeRequest] =
    useAsyncState(getCatFact);
  const handleRequest = () => {
    makeRequest();
  };
  return (
    <React.Fragment>
      <div>
        {!!error ? (
          error
        ) : !!isLoading ? (
          "Loading..."
        ) : (
          <span>Cat fact: {responseData?.fact}</span>
        )}
      </div>
      <button onClick={handleRequest}>Make request pass</button>
    </React.Fragment>
  );
};
```

## Introduction
