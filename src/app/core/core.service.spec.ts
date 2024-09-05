import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoreService } from './core.service';

fdescribe('CoreService', () => {
  let service: CoreService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        CoreService,
        { provide: MatSnackBar, useValue: snackBarMock }
      ]
    });

    service = TestBed.inject(CoreService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open snack bar with default action', () => {
    const message = 'Test message';

    service.openSnackBar(message);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'ok', {
      duration: 1000,
      verticalPosition: 'top',
    });
  });

  it('should open snack bar with custom action', () => {
    const message = 'Another message';
    const action = 'close';

    service.openSnackBar(message, action);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  });
});
