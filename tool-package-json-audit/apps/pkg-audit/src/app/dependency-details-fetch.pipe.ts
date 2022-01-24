import { Pipe, PipeTransform } from '@angular/core';
import { EnhancedVersionedNpmPackage, PackageJsonDependency, PackageJsonDependencyDetails } from "./types";
import { concatMap, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ToolsService } from "./tools.service";
import { DataService } from "./data.service";

@Pipe({
  name: 'DependencyDetailsFetch'
})
export class DependencyDetailsFetchPipe implements PipeTransform {

  constructor(private httpClient: HttpClient, private toolsService: ToolsService, private dataService: DataService) {
  }

  transform(packageJsonDependency: PackageJsonDependency, isPackageDependency: boolean = false): Observable<PackageJsonDependencyDetails | null> {
    // console.log(`${ packageJsonDependency.name }: ${ packageJsonDependency.versionRange } : ${ isPackageDependency }`);
    if (!isPackageDependency) {
      const parentVersion: PackageJsonDependencyDetails | null = this.dataService.packageDetails.get(packageJsonDependency.name) || null;

      if (!parentVersion) {
        return of(null);
      }

      const inRangeVersions: EnhancedVersionedNpmPackage[] = parentVersion.allVersions.filter(v => this.toolsService.isValid(v.version, packageJsonDependency.versionRange));

      return of({
        name: packageJsonDependency.name,
        versionRange: packageJsonDependency.versionRange,
        description: '',
        allVersions: parentVersion.allVersions,
        inRangeVersions
      })
    }

    return of(this.dataService.packageDetails.get(packageJsonDependency.name) || null).pipe(
      concatMap((cachedResponse: PackageJsonDependencyDetails | null) => {
        if (cachedResponse) {
          return of(cachedResponse);
        }


        return this.toolsService.getPackageDetailsFromNpm(packageJsonDependency);
      })
    );

  }

}
