# Local Preview Server

`server.py` hosts a simple HTTP server from a directory and opens the default browser. It is purely for manual inspection of built assets or docs exports when you are outside GAIS and do not want to run a bundler.

## Usage
```
python server.py
```

Options:
- `--port` / `-p`: port to serve (default 8000).
- `--directory` / `-d`: directory to serve (default dist).

## Notes
The script enables address reuse, changes into the target directory, and handles `KeyboardInterrupt` gracefully. Use it to preview `dist`, `export/doc-system`, or any static output before sharing with others.
