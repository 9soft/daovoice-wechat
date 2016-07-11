import queryString from 'query-string';
import 'whatwg-fetch';

const wechatAuthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';
const appId = "wx3835b5b04b704dfe";
 // 'wx7b63356cbabf7325';
const appsecret = "9c5eaf0f1a671a6c84f27446af9966be";
const query = location.search;


// 1 判断 code 是否存在
const parsed = queryString.parse(query);
const code = parsed.code;
if (!code) {
  console.log(location.href);
  // 构建重定向链接
  // location.href = location.href + '?code=1';

  // https://open.weixin.qq.com/connect/oauth2/authorize
  // 尤其注意：由于授权操作安全等级较高，所以在发起授权请求时，微信会对授权链接做正则强匹配校验，如果链接的参数顺序不对，授权页面将无法正常访问
  const buildQuery = queryString.stringify({
    appid: appId,
    redirect_uri: location.href,
    response_type: 'code',
    scope: 'snsapi_base',
    state: 'state',
  });

  const redirectUri = `${wechatAuthUrl}?${buildQuery}#wechat_redirect`;

  location.href = redirectUri;
  // console.log(redirectUri === 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60&response_type=code&scope=snsapi_base&state=123#wechat_redirect');

  // ?appid=wx520c15f417810387&redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60&response_type=code&scope=snsapi_base&state=123#wechat_redirect
}
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60&response_type=code&scope=snsapi_base&state=123#wechat_redirect

// 2 通过 code 获取用户
// https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
const buildQuery = queryString.stringify({
  appid: appId,
  secret: appsecret,
  code,
  grant_type: 'authorization_code',
});
const getTokenUrl = `/wecaht-api/sns/oauth2/access_token?${buildQuery}`;

// {
//    "access_token":"ACCESS_TOKEN",
//    "expires_in":7200,
//    "refresh_token":"REFRESH_TOKEN",
//    "openid":"OPENID",
//    "scope":"SCOPE",
//    "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
// }
fetch(getTokenUrl)
  .then(response => {
    return response.json();
  }).then(user => {
  // 3 调用 DaoVoice
    console.log('parsed json', user);
    daovoice('update', { user_id: user.openid });
    daovoice('openMessages');
  }).catch(ex => {
    console.log('parsing failed', ex);
  });


