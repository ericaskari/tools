export interface VersionedNpmPackage {
  name: string,
  description: string,
  version: string;
  dependencies?: {
    [pkgName: string]: string;
  }
  peerDependencies?: {
    [pkgName: string]: string;
  }
}

export interface EnhancedVersionedNpmPackage extends VersionedNpmPackage {
  parentVersionRange: string
}

export interface NpmPackageDetailResponse {
  name: string,
  description: string,
  versions: {
    [versionName: string]: VersionedNpmPackage;
  }
}

export interface PackageJsonDependency {
  name: string,
  versionRange: string
}

export interface PackageJsonDependencyDetails extends PackageJsonDependency {
  description: string,
  allVersions: EnhancedVersionedNpmPackage[]
  inRangeVersions: EnhancedVersionedNpmPackage[]
}
