import { Component, Input } from '@angular/core';
import { PackageJsonDependency } from "../types";
import { HttpClient } from "@angular/common/http";
import { ToolsService } from "../tools.service";

@Component({
  selector: 'app-root-dependency',
  templateUrl: './root-dependency.component.html',
  styleUrls: [ './root-dependency.component.scss' ]
})
export class RootDependencyComponent {
  @Input() packageJsonDependency: PackageJsonDependency | null = null;
  @Input() totalCount: number = 0;


  constructor(private httpClient: HttpClient, private toolsService: ToolsService) {

  }

}
