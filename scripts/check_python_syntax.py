import ast
import pathlib
import sys


def main() -> int:
    failed = False

    for filename in sys.argv[1:]:
        path = pathlib.Path(filename)
        if not path.is_file():
            continue

        try:
            ast.parse(path.read_text(), filename=str(path))
        except SyntaxError as exc:
            print(f"{path}:{exc.lineno}:{exc.offset}: {exc.msg}")
            failed = True

    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
