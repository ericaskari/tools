import { Component, Input } from '@angular/core';
import { PackageJsonDependency } from "../types";
import { ToolsService } from "../tools.service";
import { DataService } from "../data.service";

@Component({
  selector: 'app-root-dependency-version-peer',
  templateUrl: './root-dependency-version-peer.component.html',
  styleUrls: [ './root-dependency-version-peer.component.scss' ]
})
export class RootDependencyVersionPeerComponent {
  @Input() packageJsonDependency: PackageJsonDependency | null = null;
  @Input() isInRange: boolean = false;

  constructor(public toolsService: ToolsService, public dataService: DataService) {
  }

  isInRangeOfInstalledVersion(name: string, version: string) {
    const installedVersion = this.dataService.packageDetails.get(name);
    if (!installedVersion) {
      return true;
    }

    return this.toolsService.isValid(version, installedVersion.versionRange);

  }

}
