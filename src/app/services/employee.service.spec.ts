import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { Employee } from '../model/employee';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService],
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should add an employee via POST', () => {
    const mockEmployee: Employee = {
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

    service.addEmployee(mockEmployee).subscribe((employee: Employee) => {
      expect(employee).toEqual(mockEmployee);
    });

    const req = httpMock.expectOne('http://localhost:3000/employees');
    expect(req.request.method).toBe('POST');
    req.flush(mockEmployee); // Mock the response
  });

  it('should update an employee via PUT', () => {
    const mockEmployee: Employee = {
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

    service.updateEmployee(1, mockEmployee).subscribe((employee: Employee) => {
      expect(employee).toEqual(mockEmployee);
    });

    const req = httpMock.expectOne('http://localhost:3000/employees/1');
    expect(req.request.method).toBe('PUT');
    req.flush(mockEmployee); // Mock the response
  });

  it('should retrieve the list of employees via GET', () => {
    const mockEmployeeList: Employee[] = [
      {
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
      },
      {
        id: "2",
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        dob: '1992-02-02',
        gender: 'Female',
        education: 'Masters',
        company: 'XYZ Corp',
        experience: 7,
        package: 70000
      }
    ];

    service.getEmployeeList().subscribe((employees: Employee[]) => {
      expect(employees.length).toBe(2);
      expect(employees).toEqual(mockEmployeeList);
    });

    const req = httpMock.expectOne('http://localhost:3000/employees');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployeeList); // Mock the response
  });

  it('should retrieve graph data via GET', () => {
    const mockGraphData = {
      data: [10, 20, 30],
      labels: ['January', 'February', 'March']
    };

    service.getGraphData().subscribe((data: any) => {
      expect(data).toEqual(mockGraphData);
    });

    const req = httpMock.expectOne('http://localhost:3000/graph');
    expect(req.request.method).toBe('GET');
    req.flush(mockGraphData); // Mock the response
  });

  it('should delete an employee via DELETE', () => {
    service.deleteEmployee(1).subscribe(() => {
      // Expect no content returned (void)
    });

    const req = httpMock.expectOne('http://localhost:3000/employees/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Mock the response
  });
});
