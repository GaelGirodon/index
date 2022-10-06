#
# release.ps1
# Release a new version
#

# Bump the version number
npm version minor --git-tag-version "false"
$version = (Get-Content -Raw package.json | ConvertFrom-Json).version

# Build and package
npm update --save
npm run build
pushd ./dist/
rm *.json
tar -czvf ../index.tar.gz *
popd

# Commit and tag
git add package*.json *.md
git commit -m "Release $version"
git tag -a "$version" -m "$version"
