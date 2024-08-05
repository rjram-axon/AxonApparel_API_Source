CREATE TABLE [dbo].[Employee]
(
	[EmployeeId] INT PRIMARY KEY IDENTITY(1,1)  NOT NULL, 
    [Employee] NVARCHAR(40) NOT NULL, 
    [EmpNo] NVARCHAR(15) NULL, 
    [CompanyUnit] INT NULL, 
    [DepartmentId] INT NULL, 
    [DesignationId] INT NULL, 
    [Address1] NVARCHAR(250) NULL, 
    [Address2] NVARCHAR(250) NULL, 
    [Address3] NVARCHAR(250) NULL, 
    [CityId] INT NULL, 
    [Email] NVARCHAR(100) NULL, 
    [PhoneNo] NVARCHAR(15) NULL, 
    [IsActive] BIT NOT NULL DEFAULT 1, 
    [PieceRate] BIT NOT NULL, 
    [ProdEmployee] BIT NOT NULL, 
    [Relieved] BIT NOT NULL DEFAULT 0,
	CONSTRAINT [FK_City] FOREIGN KEY (CityId) REFERENCES City(Id),
	CONSTRAINT [FK_Designation] FOREIGN KEY (DesignationId) REFERENCES Designation(Id),
	CONSTRAINT [FK_Department] FOREIGN KEY (DepartmentId) REFERENCES Department(Id),
		CONSTRAINT [FK_CompanyUnit] FOREIGN KEY ([CompanyUnit]) REFERENCES [CompanyUnit](Id),

)
