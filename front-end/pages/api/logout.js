import withSession from '@/lib/session'
import axios from "axios";

export default withSession(async (req, res) => {
    const api_token = req.session.get('api_token');
    const user = req.session.get('api_token');

    if (!user) {
        return res.json(401);
    }

    req.session.destroy();

    // also destroy on the server
    //todo
    // const response = await axios.post(apiUrl(`logout`), null, {headers: {Authorization: `Bearer ${api_token}`}});

    return res.json({isLoggedIn: false});

    // if (response.status === 200) {
    //     return res.json({isLoggedIn: false})
    // }
    //
    // res.status(500).json({isLoggedIn: true})

})
