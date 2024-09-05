import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee'; 

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  // Add an employee, using Employee model
  addEmployee(data: Employee): Observable<Employee> {
    return this._http.post<Employee>('http://localhost:3000/employees', data);
  }

  // Update employee, both the id and data use Employee type
  updateEmployee(id: number, data: Employee): Observable<Employee> {
    return this._http.put<Employee>(`http://localhost:3000/employees/${id}`, data);
  }

  // Get the list of employees, the response should be an array of Employee
  getEmployeeList(): Observable<Employee[]> {
    return this._http.get<Employee[]>('http://localhost:3000/employees');
  }

  // Get graph data, assuming it might have a different structure so using `any`
  getGraphData(): Observable<any> {
    return this._http.get('http://localhost:3000/graph');
  }

  // Delete employee by id
  deleteEmployee(id: number): Observable<void> {
    return this._http.delete<void>(`http://localhost:3000/employees/${id}`);
  }
}
