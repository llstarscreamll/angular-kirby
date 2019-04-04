import { Component, OnInit } from '@angular/core';

import { WorkShiftsFacade } from '@llstarscreamll/work-shifts/data-access';

@Component({
  selector: 'update-work-shift-page',
  templateUrl: './update-work-shift-page.component.html',
  styleUrls: ['./update-work-shift-page.component.scss']
})
export class UpdateWorkShiftPageComponent implements OnInit {

  public constructor(private workShiftsFacade: WorkShiftsFacade) { }

  public ngOnInit() { }

}
