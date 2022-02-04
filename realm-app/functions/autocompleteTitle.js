exports = async (title) => {
    const collection = context.services.get("mongodb-atlas").db("sample_mflix").collection("movies");
    return await collection.aggregate([
      {
          $search: {
              autocomplete: {
                  path: "title",
                  query: title,
                  fuzzy: { maxEdits: 1 },
              },
          },
      },
      {
          $project: {
              title: 1,
          },
      },
      {
          $limit: 10,
      },
    ]).toArray();
};