import { Pipe, PipeTransform } from '@angular/core';
import { PackageJsonDependency, VersionedNpmPackage } from "./types";

@Pipe({
  name: 'peersToList'
})
export class PeersToListPipe implements PipeTransform {

  transform(versionedNpmPackage: VersionedNpmPackage | null | undefined, ...args: unknown[]): PackageJsonDependency[] {
    if (!versionedNpmPackage) {
      return [];
    }

    return Object.entries(versionedNpmPackage.peerDependencies || {})
      .map(([ name, versionRange ]) => {
        return {
          name, versionRange
        }
      });
  }

}
