#
# release.ps1
# Release a new version
#

# Bump the version number
$env:npm_config_git_tag_version = "false"
$version = (npm version minor).trim("v")

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
npm version "$(npm version minor)-dev"
