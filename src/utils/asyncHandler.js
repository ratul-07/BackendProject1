// const asyncHandler = () => {}

const asyncHandler = (requestHandler) => {
    (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).
    catch((error) => next(error))
    }
}

export {asyncHandler}

//wrinting the above promises code in try catch method

// const asyncHandler = () => {}
// const asyncHandler = (function) => () => {}
// const asuncHandler = async (function) => () => {}

//Higher order functions (functions which takes functions as parameters): making is shown above
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req,res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         }) 
//     }
// }