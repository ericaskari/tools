import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PackageJsonDependency } from "./types";
import { DataService } from "./data.service";


@Component({
  selector: 'app-audit-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent {
  public packageJsonDependencies: PackageJsonDependency[] = [];

  constructor(private httpClient: HttpClient, private dataService: DataService) {
    this.getPackageJson()
  }


  async getPackageJson() {
    this.packageJsonDependencies = await this.dataService.initialize();

    //  package json
    // const packageJson = await this.httpClient.get<VersionedNpmPackage>('/assets/input.json').pipe(first()).toPromise();
    //
    // if (!packageJson) {
    //   return;
    // }
    //
    // //  package json dependencies
    // const { dependencies: packageJsonDependencies = {} } = packageJson;
    //
    // this.packageJsonDependencies = Object.entries(packageJsonDependencies)
    //   .map(([ name, versionRange ]) => ({
    //     name,
    //     versionRange
    //   }));
    //
    // console.log(this.packageJsonDependencies)

  }

  // async getData() {
  //   //  package json
  //   const packageJson = await this.httpClient.get<NpmPackage>('/assets/input.json').pipe(first()).toPromise();
  //
  //   if (!packageJson) {
  //     return;
  //   }
  //
  //   //  package json dependencies
  //   const { dependencies: packageJsonDependencies = {} } = packageJson;
  //
  //   this.packageJsonDependencies = Object.entries(packageJsonDependencies)
  //     .map(([ name, versionRange ]) => ({
  //       name,
  //       versionRange
  //     }))
  //
  //   //  package json dependencies name list
  //   const packageJsonDependenciesNames: string[] = Object.keys(packageJsonDependencies);
  //
  //
  //   //  promise list for each dependency to get details
  //   const dependenciesGetDetailRequests: Promise<NpmPackageDetailResponse | undefined>[] = packageJsonDependenciesNames
  //     .map(packageJsonDependencyName => {
  //       return this.httpClient
  //         .get<NpmPackageDetailResponse>(`https://registry.npmjs.org/${ packageJsonDependencyName }`)
  //         .pipe(first())
  //         .toPromise();
  //     });
  //
  //
  //   //  list for each dependency details
  //   const dependenciesDetailsResponses: (NpmPackageDetailResponse | undefined)[] = await Promise.all(dependenciesGetDetailRequests);
  //
  //
  //   //  list for each dependency details (converted versions entity to array)
  //   this.allDependenciesDetails = dependenciesDetailsResponses
  //     .reduce((previousValue: PackageJsonDependencyDetails[], currentValue: NpmPackageDetailResponse | undefined): PackageJsonDependencyDetails[] => {
  //       if (!currentValue) {
  //         return previousValue;
  //       }
  //
  //       return [ ...previousValue, this.toolsService.npmPackageDetailResponseToNpmPackageDetail(currentValue) ];
  //     }, []);
  //
  //
  //   const dependencyTreeRoots: DependencyTreeRoot[] = Object.entries(packageJsonDependencies)
  //     .map(([ appDependencyName, appDependencyVersionRange ]): DependencyTreeRoot => {
  //
  //       return {
  //         name: appDependencyName,
  //         versionRange: appDependencyVersionRange
  //       }
  //     });
  //
  //   //  TODO: should handle all versions
  //   const dependencyTreeRootsExtended: DependencyTreeRootExtended[] = dependencyTreeRoots
  //     .map((dependencyTreeRoot): DependencyTreeRootExtended => {
  //
  //       console.log(`${ dependencyTreeRoot.name }`);
  //
  //       const allVersions = this.toolsService.getAllVersions(
  //         dependencyTreeRoot.name,
  //         this.allDependenciesDetails
  //       );
  //
  //       return {
  //         ...dependencyTreeRoot,
  //         versions: allVersions.map((versionDetail) => {
  //           const isInRange = this.toolsService.isValid(versionDetail.version, dependencyTreeRoot.versionRange);
  //
  //           return {
  //             details: versionDetail,
  //             isInRange,
  //             peers: Object.entries(versionDetail.peerDependencies || {})
  //               .map(([ name, versionRange ]) => {
  //                 return {
  //                   versionRange,
  //                   name,
  //                   allowedVersions: this.toolsService.getAllowedVersions(
  //                     name,
  //                     versionRange,
  //                     this.allDependenciesDetails
  //                   )
  //                 }
  //               })
  //           }
  //         })
  //       }
  //     });
  //
  //   console.log(dependencyTreeRootsExtended)
  //   this.viewData = dependencyTreeRootsExtended
  //
  //
  //   // const viewDataWithInternalPeers: ViewDataWithInternalPeers[] = dependencyTreeRootsExtended.map((viewDataWithPeers: DependencyTreeRootExtended): ViewDataWithInternalPeers => {
  //   //   const peerDepNames = viewDataWithPeers.peerDependencies.map(x => x.pkgName);
  //   //
  //   //   const peers: DependencyTreeRootExtended[] = peerDepNames
  //   //     .map(peerDepName => dependencyTreeRootsExtended.find(x => x.name === peerDepName))
  //   //     .reduce((prev: DependencyTreeRootExtended[], curr: DependencyTreeRootExtended | undefined): DependencyTreeRootExtended[] => {
  //   //       if (!curr) {
  //   //         return prev;
  //   //       }
  //   //       return [ ...prev, curr ];
  //   //     }, [] as DependencyTreeRootExtended[])
  //   //
  //   //
  //   //   return {
  //   //     ...viewDataWithPeers,
  //   //     sharedPeerDependencies: peers.map(x => {
  //   //       return {
  //   //         pkgName: x.name,
  //   //         version: x.versionRange
  //   //       }
  //   //     })
  //   //   }
  //   //
  //   // });
  //
  // }

}
