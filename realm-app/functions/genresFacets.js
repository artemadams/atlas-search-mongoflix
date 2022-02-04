exports = async(arg) => {
  const collection = context.services.get("mongodb-atlas").db("sample_mflix").collection("movies");
  
  return await collection.aggregate([
    {
      $searchMeta: {
        index: "facets",
        
       facet: {
         operator: {
           range: {
             path: "year",
             gte: 1900
           }
         },
         facets: {
           genresFacet: {
             type: "string",
             path: "genres"
           }
         }
       }
      }
    }
 ]).toArray();
};