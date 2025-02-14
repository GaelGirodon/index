#
# release.sh
# Release a new version
#

set -ex

# Bump the version number
export NPM_CONFIG_GIT_TAG_VERSION="false"
version=$(npm version minor | cut -c2-)

# Build and package
npm run build
pushd ./dist/
rm ./*.json
tar -czvf ../index.tar.gz *
popd

# Commit and tag
git add ./package*.json ./*.md
git commit -m "Release $version"
git tag -a "$version" -m "$version"
npm version "$(npm version minor)-dev"
