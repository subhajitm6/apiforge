import ipaddress
import socket
from urllib.parse import urlparse

def is_safe_url(url: str) -> tuple[bool, str]:
    """
    SSRF Protection:
    Blocks localhost, private IP spaces, cloud metadata endpoints,
    and link-local / broadcast addresses.
    Returns (is_safe, error_reason).
    """
    try:
        parsed = urlparse(url)
        if parsed.scheme not in ("http", "https"):
            return False, "Invalid protocol scheme (must be http or https)."
        
        hostname = parsed.hostname
        if not hostname:
            return False, "URL does not contain a valid hostname."

        # Block localhost strings directly
        if hostname.lower() in ("localhost", "127.0.0.1", "::1", "0.0.0.0"):
            return False, "SSRF Protection: Localhost access is blocked."

        # Resolve IP addresses for hostname
        try:
            addr_info = socket.getaddrinfo(hostname, None)
        except socket.gaierror as e:
            # Domain does not exist or cannot be resolved via DNS
            return False, f"DNS Resolution failed: host '{hostname}' could not be resolved."
        except Exception as e:
            return False, f"DNS error: {str(e)}"

        for item in addr_info:
            ip_str = item[4][0]
            ip = ipaddress.ip_address(ip_str)
            if (
                ip.is_private
                or ip.is_loopback
                or ip.is_reserved
                or ip.is_link_local
                or ip.is_multicast
            ):
                return False, f"SSRF Protection: IP address {ip_str} is restricted (private/loopback/cloud)."
            # Check 169.254.169.254 (Cloud metadata)
            if ip_str.startswith("169.254."):
                return False, f"SSRF Protection: Metadata IP {ip_str} is blocked."

        return True, ""
    except Exception as e:
        return False, str(e)

