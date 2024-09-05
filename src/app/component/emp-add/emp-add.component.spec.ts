import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpAddComponent } from './emp-add.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

describe('EmpAddComponent', () => {
  let component: EmpAddComponent;
  let fixture: ComponentFixture<EmpAddComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;
  let coreServiceSpy: jasmine.SpyObj<CoreService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EmpAddComponent>>;

  const mockEmployee = {
    id: "1",
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dob: '1990-01-01',
    gender: 'Male',
    education: 'Graduate',
    company: 'ABC Corp',
    experience: 5,
    package: 50000
  };

  beforeEach(async () => {
    employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['addEmployee', 'updateEmployee']);
    coreServiceSpy = jasmine.createSpyObj('CoreService', ['openSnackBar']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
      ],
      declarations: [EmpAddComponent],
      providers: [
        FormBuilder,
        { provide: EmployeeService, useValue: employeeServiceSpy },
        { provide: CoreService, useValue: coreServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: null }, // Initially no data
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values when no data is provided', () => {
    expect(component.empForm.value).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    });
  });

  it('should initialize the form with provided data for editing', () => {
    // Provide mock data for editing
    component.data = mockEmployee;
    component.ngOnInit(); // Manually trigger ngOnInit as this is usually called automatically

    expect(component.empForm.value).toEqual(mockEmployee);
  });

  it('should mark all fields as touched if form is invalid on submit', () => {
    component.onFormSubmit();
    expect(component.empForm.touched).toBeTrue();
  });

  it('should add a new employee on valid form submission', () => {
    const mockNewEmployee = { ...mockEmployee, id: "" }; // Assuming the backend generates the ID
    component.empForm.setValue(mockNewEmployee);

    employeeServiceSpy.addEmployee.and.returnValue(of(mockNewEmployee));

    component.onFormSubmit();

    expect(employeeServiceSpy.addEmployee).toHaveBeenCalledWith(component.empForm.value);
    expect(coreServiceSpy.openSnackBar).toHaveBeenCalledWith('Employee added successfully');
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });


  it('should handle errors during form submission', () => {
    const errorMessage = 'Error occurred';
    employeeServiceSpy.addEmployee.and.returnValue(throwError(() => new Error(errorMessage)));

    component.empForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      dob: '1990-01-01',
      gender: 'Male',
      education: 'Graduate',
      company: 'ABC Corp',
      experience: 5,
      package: 50000,
    });

    spyOn(console, 'error');

    component.onFormSubmit();

    expect(employeeServiceSpy.addEmployee).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
  });
});
