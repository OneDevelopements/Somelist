import Cookie from 'js-cookie';
import * as conf from '../settings';
import axios from 'axios';

async function exchangeToken(code) {
    return await axios.post('https://discordapp.com/api/oauth2/token', `code=${code}&grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URI)}&scope=guilds%20identify`, {headers: {"Content-Type": "application/x-www-form-urlencoded"}}).then(
        (res) => {
            return res.data;
        }, error => {
            if (error.response.status.toString() === "400"){
                return error.response.status;
            }
        }
    );
}

async function saveUser( token ){
    return await axios.get('https://discord.com/api/oauth2/@me', {headers: {"Authorization": `Bearer ${token}`}}).then(
        (res) => {
            console.log(res.data)
            Cookie.set('id', res.data.user.id)
            Cookie.set('username', res.data.user.username)
            Cookie.set('discriminator', res.data.user.discriminator)
            return res.data;
        }
    );
}

async function getGuilds ( token ){
    console.log(token)
    return await axios.get('https://discord.com/api/users/@me/guilds', {headers: {"Authorization": `Bearer ${token}`}}).then(
        async (res) => {
            var aguilds = []
            var uguilds = []
            res.data.map((guild)=>{
                uguilds.push(guild.id.toString())
            })
            await axios.get('https://discord.com/api/users/@me/guilds', {headers: {"Authorization": `Bot ${process.env.NEXT_PUBLIC_TOKEN}`}}).then(
            async (res) =>{
                    res.data.map((guild)=>{
                        if(uguilds.includes(guild.id.toString())){
                            aguilds.push(guild)
                        }
                    })
                })
            return aguilds;
        }
    );
}



async function refreshToken( refreshToken ) {
    const res = await axios.post('https://discord.com/api/oauth2/token', `refresh_token=${refreshToken}&grant_type=refresh_token&client_id=${conf.clientID}&client_secret=${conf.clientSecret}&redirect_uri=${conf.redirect_uri}&scope=guilds%20identify`, {headers: {"Content-Type": "application/x-www-form-urlencoded"}}).catch(console.error);
    return res.data;
}


function saveTokens( token, refreshToken){
    Cookie.set('token', token);
    Cookie.set('refreshToken', refreshToken);
}



function deleteTokens(){
    Cookie.remove('id');
    Cookie.remove('username');
    Cookie.remove('token');
    Cookie.remove('refreshToken');
    Cookie.remove('avatar')
}

function getTokensForBrowser() {
    let token = Cookie.getJSON('token');
    let refreshToken = Cookie.getJSON('refreshToken');
    return {
        token: token,
        refreshToken: refreshToken
    };
}


function getTokensForServer(req) {
    if (req.headers.cookie) {
        try{
            const cookieToken = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='));
            const cookieRefreshToken = req.headers.cookie.split(';').find(c => c.trim().startsWith('refreshToken='));

            let token = cookieToken.split('=')[1];
            let refreshToken = cookieRefreshToken.split('=')[1];
            return {
                token: token,
                refreshToken: refreshToken
            };
        } catch{
            console.log('faied')
        }
    }
}

export {
    exchangeToken,
    refreshToken,
    saveTokens,
    getGuilds,
    saveUser,
    deleteTokens,
    getTokensForBrowser,
    getTokensForServer
};
