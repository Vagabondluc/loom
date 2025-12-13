#!/usr/bin/env python3
import argparse
import http.server
import os
import socketserver
import sys
import webbrowser


class ReusableTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True


def serve(port: int, directory: str) -> None:
    """Start a simple HTTP server and open the default browser."""
    handler = http.server.SimpleHTTPRequestHandler
    target_dir = os.path.abspath(directory)
    os.chdir(target_dir)
    with ReusableTCPServer(("", port), handler) as httpd:
        webbrowser.open(f"http://localhost:{port}")
        print(f"Serving {target_dir} at http://localhost:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down.")


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve the Manifestation Console locally.")
    parser.add_argument(
        "--port",
        "-p",
        type=int,
        default=8000,
        help="Port to bind the HTTP server (default: 8000)",
    )
    parser.add_argument(
        "--directory",
        "-d",
        default="dist",
        help="Directory to serve (default: dist)",
    )
    args = parser.parse_args()

    try:
        serve(args.port, args.directory)
    except OSError as exc:
        sys.exit(f"Failed to start server: {exc}")


if __name__ == "__main__":
    main()
