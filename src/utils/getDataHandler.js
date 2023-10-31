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
        (accumulator, currentValue, i) => [
          ...accumulator,
          {
            no: i + 1,
            id: currentValue.id,
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
        (accumulator, currentValue, i) => [
          ...accumulator,
          {
            no: i + 1,
            id: currentValue.id,
            key: currentValue.id,
            ...currentValue,
          },
        ],
        []
      );
    case "proxy":
      return data.reduce(
        (accumulator, currentValue, i) => [
          ...accumulator,
          {
            no: i + 1,
            id: currentValue.id,
            key: currentValue.id,
            ...currentValue,
          },
        ],
        []
      );
    case "browser":
      return data.reduce(
        (accumulator, currentValue, i) => [
          ...accumulator,
          {
            no: i + 1,
            id: currentValue.id,
            key: currentValue.id,
            ...currentValue,
          },
        ],
        []
      );
    case "login":
      return data.reduce(
        (accumulator, currentValue, i) => [
          ...accumulator,
          {
            no: i + 1,
            id: currentValue.id,
            key: currentValue.id,
            ...currentValue,
          },
        ],
        []
      );
    case "machine":
      return data.reduce(
        (accumulator, currentValue, i) => [
          ...accumulator,
          {
            no: i + 1,
            id: currentValue.id,
            key: currentValue.id,
            ...currentValue,
          },
        ],
        []
      );
    case "surfing":
      return data.reduce(
        (accumulator, currentValue, i) => [
          ...accumulator,
          {
            no: i + 1,
            id: currentValue.id,
            key: currentValue.id,
            ...currentValue,
          },
        ],
        []
      );
    case "job":
      return data.jobs.reduce(
        (accumulator, currentValue, i) => [
          ...accumulator,
          {
            no: i + 1,
            id: currentValue.id,
            key: currentValue.id,
            login_user: currentValue.login ? currentValue.login.user : "",
            machine_id: currentValue.machine
              ? currentValue.machine.machine_id
              : "",
            proxy_ip: currentValue.proxy?.ip,
            browser_name: currentValue.browser?.name,

            ...currentValue,
          },
        ],
        []
      );
    case "history":
      return data.reduce(
        (accumulator, currentValue, i) => [
          ...accumulator,
          {
            no: i + 1,
            id: currentValue.id,
            key: currentValue.id,
            ...currentValue,
          },
        ],
        []
      );
    case "log":
      return data.member_loglist.reduce(
        (accumulator, currentValue, i) => [
          ...accumulator,
          {
            no: i + 1,
            id: currentValue.id,
            key: currentValue.id,
            action: currentValue.function_param,
            user: currentValue.member_name,
            time: currentValue.created_at,
            ...currentValue,
          },
        ],
        []
      );
    case "coupon":
      return data.couponsList.reduce((accumulator, currentValue, i) => {
        return [
          ...accumulator,
          {
            no: i + 1,
            id: currentValue.id,
            name: currentValue.name,
            category_id: currentValue.category_id,
            brand_id: currentValue.brand_id,
            category: currentValue.category,
            brand: currentValue.brand,
            desc: currentValue.desc,
            price: currentValue.price,
            discount: currentValue.discount,
            image1: currentValue.image1,
            image2: currentValue.image2,
            image3: currentValue.image3,
            status: currentValue.status,
            key: currentValue.id,
          },
        ];
      }, []);
    case "coupon_category":
      return data.reduce((accumulator, currentValue, i) => {
        return [
          ...accumulator,
          {
            // no: i + 1,
            id: currentValue.id,
            name: currentValue.name,
            image1: currentValue.image1,
            image2: currentValue.image2,
            image3: currentValue.image3,
            status: currentValue.status,
            parent_id: currentValue.parent_id,
            key: currentValue.key,
            children: currentValue.children,
          },
        ];
      }, []);
    case "brand":
      return data.reduce((accumulator, currentValue, i) => {
        return [
          ...accumulator,
          {
            no: i + 1,
            id: currentValue.id,
            name: currentValue.name,
            image1: currentValue.image1,
            image2: currentValue.image2,
            image3: currentValue.image3,
            key: currentValue.id,
          },
        ];
      }, []);
    default:
      return data;
  }
};

export default getDataHandler;
