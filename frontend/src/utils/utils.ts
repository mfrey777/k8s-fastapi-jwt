export function accessibleRouteChangeHandler(): number {
  return window.setTimeout(() => {
    const mainContainer = document.getElementById('primary-app-container');
    if (mainContainer) {
      mainContainer.focus();
    }
  }, 50);
}

export function redirectSubdomain(tenant: string, path = ''): void {
  const host = window.location.host;
  const protocol = window.location.protocol;
  const parts = host.split('.');
  // let subdomain = '';
  // If we get more than 3 parts, then we have a subdomain
  // INFO: This could be 4, if you have a co.uk TLD or something like that.
  if (parts.length >= 3) {
    // subdomain = parts[0];
    parts[0] = tenant;
    const newUrl = protocol + '//' + parts.join('.') + path;
    window.location.assign(newUrl);
  }
}
