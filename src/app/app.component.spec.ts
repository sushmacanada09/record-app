import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EmployeeService } from './services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from './core/core.service';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { Employee } from './model/employee';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let coreServiceSpy: jasmine.SpyObj<CoreService>;

  beforeEach(async () => {
    employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getEmployeeList', 'deleteEmployee']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    coreServiceSpy = jasmine.createSpyObj('CoreService', ['openSnackBar']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [BrowserAnimationsModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatPaginatorModule,
        MatTableModule,MatInputModule
      ],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: CoreService, useValue: coreServiceSpy }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    // Mocking employee data
    const mockEmployee: Employee = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      dob: '1990-01-01T00:00:00Z',
      gender: 'Male',
      education: 'B.Sc',
      company: 'ABC Corp',
      experience: 5,
      package: 50000,
    };

    employeeServiceSpy.addEmployee.and.returnValue(of(mockEmployee));
    employeeServiceSpy.deleteEmployee.and.returnValue(of(undefined));

    fixture.detectChanges(); // Triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load employee list on init', () => {
    expect(employeeServiceSpy.getEmployeeList).toHaveBeenCalled();
    expect(component.dataSource).toBeTruthy();
    expect(component.dataSource instanceof MatTableDataSource).toBeTrue();
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should apply filter correctly', () => {
    const event = { target: { value: 'john' } } as unknown as Event;
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('john');
  });

  it('should delete employee and refresh list', () => {
    component.deleteEmployee(1);
    expect(employeeServiceSpy.deleteEmployee).toHaveBeenCalledWith(1);
    expect(employeeServiceSpy.getEmployeeList).toHaveBeenCalled();
    expect(coreServiceSpy.openSnackBar).toHaveBeenCalledWith('Employee deleted!', 'done');
  });

  it('should open add/edit employee form', () => {
    const mockDialogRef = { afterClosed: () => of(true) };
    dialogSpy.open.and.returnValue(mockDialogRef as any);
    
    component.openAddEditEmpForm();
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(employeeServiceSpy.getEmployeeList).toHaveBeenCalled();
  });

  it('should open graph form', () => {
    const mockDialogRef = { afterClosed: () => of(true) };
    dialogSpy.open.and.returnValue(mockDialogRef as any);

    component.openGraphForm();
    expect(dialogSpy.open).toHaveBeenCalled();
  });
});
