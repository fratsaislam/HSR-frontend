export function getTokenFromCookie() {
    const cookieStr = document.cookie
      .split('; ')
      .find(row => row.startsWith('Authorization='));
  
    if (!cookieStr) return null;
  
    const token = cookieStr.split('=')[1].replace('Bearer%20', '').replace('Bearer ', '');
    return decodeURIComponent(token);
  }
  