import { Injectable } from "@angular/core";
import { PackageJsonDependency, PackageJsonDependencyDetails, VersionedNpmPackage } from "./types";
import { first, Observable, zip } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ToolsService } from "./tools.service";


@Injectable({
  providedIn: "root"
})
export class DataService {
  packageDetails = new Map<string, PackageJsonDependencyDetails>();

  constructor(private httpClient: HttpClient, private toolsService: ToolsService) {
  }

  async initialize(): Promise<PackageJsonDependency[]> {
    const packageJson = await this.httpClient.get<VersionedNpmPackage>('/assets/input.json').pipe(first()).toPromise();

    if (!packageJson) {
      return []
    }

    const packageJsonDependencies: PackageJsonDependency[] = this.toolsService.getVersionedNpmPackageDependencies(packageJson);

    const requestList = packageJsonDependencies.map(packageJsonDependency => this.toolsService.getPackageDetailsFromNpm(packageJsonDependency));

    const zipData$: Observable<PackageJsonDependencyDetails[]> = zip(requestList);

    const packageJsonDependencyDetailsList: PackageJsonDependencyDetails[] = (await zipData$.pipe(first()).toPromise()) || [];

    packageJsonDependencyDetailsList.map(d => {
      this.packageDetails.set(d.name, d);
    });

    return packageJsonDependencies;
  }
}
