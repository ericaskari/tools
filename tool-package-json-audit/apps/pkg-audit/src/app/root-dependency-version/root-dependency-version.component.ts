import { Component, Input } from '@angular/core';
import { EnhancedVersionedNpmPackage, PackageJsonDependency } from "../types";
import { ToolsService } from "../tools.service";

@Component({
  selector: 'app-root-dependency-version',
  templateUrl: './root-dependency-version.component.html',
  styleUrls: [ './root-dependency-version.component.scss' ]
})
export class RootDependencyVersionComponent {
  @Input() dependencyVersion: EnhancedVersionedNpmPackage | null = null;

  constructor(private toolsService: ToolsService) {
  }

  get isInRange(): boolean {
    if (!this.dependencyVersion) {
      return false;
    }

    return this.toolsService.isValid(this.dependencyVersion.version, this.dependencyVersion.parentVersionRange);
  }

  get peers(): PackageJsonDependency[] {
    if (!this.dependencyVersion || !this.dependencyVersion.parentVersionRange) {
      return [];
    }

    return Object.entries(this.dependencyVersion.peerDependencies || {})
      .map(([ name, versionRange ]) => {
        return {
          name, versionRange
        }
      });
  }
}
