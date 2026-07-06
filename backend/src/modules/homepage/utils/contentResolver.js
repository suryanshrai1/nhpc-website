export const resolveContent = (contentArray = []) => {

    return contentArray.reduce((resolved, item) => {

        resolved[item.content_key] = item.content_value;

        return resolved;

    }, {});

};