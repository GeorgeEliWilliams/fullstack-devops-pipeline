import withSession from "@/lib/session";

export default withSession(async (req, res) => {
    const user = req.session.get('user');

    const current_token = req.session.get('api_token');

    const {updated_user, api_token} = await req.body

    if (api_token !== current_token) {
        return res.status(401).json({message: "Unauthorized!"});
    }

    if (!user) {
        return res.status(500).json({message: "No user found!"})
    }

    console.log(updated_user);
    // @todo
    //amend session instead of recreating it
    Object.assign(user, updated_user);  // Update user fields only
    req.session.set('user', user);
    await req.session.save()
    return res.json({user_amended: true});
})