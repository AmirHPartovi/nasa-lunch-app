const DEFAULT_LIMIT_NUMBER = 0;
const DEFAULT_PAGE_NUMBER = 1;

function getPagination(query){
    const page = query?.page || DEFAULT_PAGE_NUMBER;
    const limit = query?.limit || DEFAULT_LIMIT_NUMBER;
    const skip = (page - 1) * limit;

    return{
        limit,
        skip,
    }
}

module.exports=getPagination