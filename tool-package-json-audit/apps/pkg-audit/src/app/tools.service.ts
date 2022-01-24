import { Injectable } from "@angular/core";
import {
  EnhancedVersionedNpmPackage,
  NpmPackageDetailResponse,
  PackageJsonDependency,
  PackageJsonDependencyDetails,
  VersionedNpmPackage
} from "./types";
import { satisfies } from "semver";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ToolsService {

  constructor(private httpClient: HttpClient) {
  }

  versionsEntityToArray(versions: { [version: string]: VersionedNpmPackage }): VersionedNpmPackage[] {
    return Object.entries(versions).map(([ version, details ]): VersionedNpmPackage => {
      return details;
    });
  }

  getVersionedNpmPackageDependencies(mainPackageJson: VersionedNpmPackage): PackageJsonDependency[] {
    return Object.entries(mainPackageJson.dependencies || {}).map(([ name, versionRange ]) => ({
      name,
      versionRange
    }));
  }

  getVersionedNpmPackagePeerDependencies(mainPackageJson: VersionedNpmPackage): PackageJsonDependency[] {
    return Object.entries(mainPackageJson.peerDependencies || {}).map(([ name, versionRange ]) => ({
      name,
      versionRange
    }));
  }

  getPackageDetailsFromNpm(packageJsonDependency: PackageJsonDependency): Observable<PackageJsonDependencyDetails> {
    return this.httpClient
      .get<NpmPackageDetailResponse>(`https://registry.npmjs.org/${ packageJsonDependency.name }`).pipe(
        map((response: NpmPackageDetailResponse): PackageJsonDependencyDetails => {

          const allVersions: EnhancedVersionedNpmPackage[] = this.versionsEntityToArray(response.versions).map((x) => ({
            ...x,
            parentVersionRange: packageJsonDependency.versionRange
          })).reverse();

          const inRangeVersions: EnhancedVersionedNpmPackage[] = allVersions.filter(v => this.isValid(v.version, packageJsonDependency.versionRange));


          return {
            name: packageJsonDependency.name,
            versionRange: packageJsonDependency.versionRange,
            description: response.description,
            allVersions: allVersions.length > 50 ? allVersions.slice(0, 50) : allVersions,
            inRangeVersions
          }

        })
      )
  }

  isValid(version: string, versionToVerify: string): boolean {
    return satisfies(version, versionToVerify);
  }
}
