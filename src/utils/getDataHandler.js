const getDataHandler = (data, pageName) => {
  switch (pageName) {
    case "level":
      return data.reduce((accumulator, currentValue) => {
        return [
          ...accumulator,
          {
            id: currentValue.id,
            name: currentValue.name,
            key: currentValue.id,
          },
        ];
      }, []);
    case "member":
      return data.members.reduce(
        (accumulator, currentValue) => [
          ...accumulator,
          {
            no: currentValue.id,
            name: currentValue.name,
            level: currentValue.level_name,
            parent: currentValue.parent_name,
            level_id: currentValue.level_id,
            parent_id: currentValue.parent,
            key: currentValue.id,
          },
        ],
        []
      );
    case "goods":
      return data.reduce(
        (accumulator, currentValue) => [
          ...accumulator,
          {
            no: currentValue.id,
            key: currentValue.id,
            ...currentValue,
          },
        ],
        []
      );
    case "proxy":
      return data.reduce(
        (accumulator, currentValue) => [
          ...accumulator,
          {
            no: currentValue.id,
            key: currentValue.id,
            ...currentValue,
          },
        ],
        []
      );
    case "browser":
      return data.reduce(
        (accumulator, currentValue) => [
          ...accumulator,
          {
            no: currentValue.id,
            key: currentValue.id,
            ...currentValue,
          },
        ],
        []
      );
    case "login":
      return data.reduce(
        (accumulator, currentValue) => [
          ...accumulator,
          {
            no: currentValue.id,
            key: currentValue.id,
            ...currentValue,
          },
        ],
        []
      );
    case "surfing":
      return data.reduce(
        (accumulator, currentValue) => [
          ...accumulator,
          {
            no: currentValue.id,
            key: currentValue.id,
            ...currentValue,
          },
        ],
        []
      );
    default:
      return data;
  }
};

export default getDataHandler;
