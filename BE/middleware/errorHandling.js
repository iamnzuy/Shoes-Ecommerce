export default function errorHandling (err, _, res, next) {
    let status=err.status || 500;
    let message=err.message || 'something went wrong'
    return res.status(status).send({ message });
}