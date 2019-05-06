export function loadModule(url) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.onload = ({ type }) => resolve({ status: type, url });
    script.onerror = ({ type }) => resolve({ status: type, url });
    script.src = url;
    document.body.appendChild(script);
  });
}
