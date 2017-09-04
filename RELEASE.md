0. Ensure that `dist/` and `index.html` are not committed on `develop`.
```bash
npm run clean
```

1. Update version in package.json on `develop`.

2. Create RC commit on `develop` with new version number:
```bash
git add package.json
git commit -m "RC MAJOR.MINOR.PATCH [- optional message]"
git push
```

3. Switch to `master`:
```bash
git checkout master
```

4. Merge `develop` into `master`:
```bash
git merge --no-commit develop
```

5. Test out the demo page locally:
```bash
npm run dev
```

6. Build new package and demo page, and ensure all tests pass:
```bash
npm run build
```

7. Ensure that the following pieces of information are still correct in the auto-generated comment at the top of vue-typer.js and vue-typer.min.js:
- Package name
- Version number
- Copyright date
- License

8. Ensure that the paths in `index.html` correctly point to the built files in `dist/`

9. Commit and tag with the same message:
```bash
git add dist index.html
git commit -m "[release] vMAJOR.MINOR.PATCH"
git tag -a vMAJOR.MINOR.PATCH -m "[release] vMAJOR.MINOR.PATCH"
```

10. Publish to npm:
```bash
npm publish
```

11. Push to github:
```bash
git push --follow-tags
```

12. Add release notes on Github.
