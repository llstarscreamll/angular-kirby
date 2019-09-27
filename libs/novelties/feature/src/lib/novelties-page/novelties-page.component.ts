import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Pagination } from '@kirby/shared';
import { User } from '@kirby/users/util';
import { NoveltyModel } from '@kirby/novelties/data';
import { AuthFacade } from '@kirby/authentication-data-access';
import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'kirby-novelties-page',
  templateUrl: './novelties-page.component.html',
  styleUrls: ['./novelties-page.component.scss']
})
export class NoveltiesPageComponent implements OnInit, OnDestroy {
  public novelties$: Observable<Pagination<NoveltyModel>>;
  public user$: Observable<User>;
  private user: User;
  private destroy$ = new Subject();
  public searchQuery = {};

  public constructor(
    private noveltiesFacade: NoveltiesFacade,
    private authFacade: AuthFacade
  ) {}

  public ngOnInit() {
    this.novelties$ = this.noveltiesFacade.paginatedNovelties$;
    this.user$ = this.authFacade.authUser$;
    this.user$
      .pipe(
        tap(user => (this.user = user)),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.searchNovelties();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public searchNovelties(query: any = {}) {
    this.searchQuery = { ...this.searchQuery, ...query };
    this.noveltiesFacade.search(this.searchQuery);
  }

  public shortName(approver: { first_name: string; last_name: string }) {
    return [
      approver.first_name
        .trim()
        .split(' ')
        .shift(),
      approver.last_name
        .trim()
        .split(' ')
        .shift()
    ].join(' ');
  }

  public showApproveButton(novelty: NoveltyModel): boolean {
    return !novelty.isApprovedByUserId(this.user ? this.user.id : null);
  }

  public showDeleteApprovalButton(novelty: NoveltyModel): boolean {
    return novelty.isApprovedByUserId(this.user ? this.user.id : null);
  }

  public approveNovelty(novelty: NoveltyModel) {
    this.noveltiesFacade.approve(novelty.id, this.user);
  }

  public deleteNoveltyApproval(novelty: NoveltyModel) {
    this.noveltiesFacade.deleteNoveltyApproval(novelty.id, this.user);
  }
}
