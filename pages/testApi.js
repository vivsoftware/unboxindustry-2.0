// import connection from "./testDbConnection";

// export default async function handler(req, res) {
//     const [users,setUsers] = useState('');
//     switch (req.method) {
//         case 'GET':
//             try{
//                 const query = 'SELECT * FROM user';
//                 connection.query(query, (err, results) => {
//                     if (err) throw err;
//                     res.status(200).json(results);
//                     console.log("testApi Results", results);
//                 });
//             }catch(err){
//                 res.status(500).json({message: err.message});
//             }
//             break;
//         default:
//             res.status(400).json({ erorr : 'invalid request'});
//             break;
//     }
// }
