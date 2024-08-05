CREATE TABLE [dbo].[MerchTeamEmployee]
(
	MechTeamEmployeeId INT NOT NULL PRIMARY KEY identity(1,1),
	TeamId [int] NULL,
	EmployeeId int NULL,
	CONSTRAINT [FK_Teamemp] FOREIGN KEY (TeamId) REFERENCES [MerchTeamMas]([TeamId]),
	CONSTRAINT [FK_TeamEmployee] FOREIGN KEY (EmployeeId) REFERENCES Employee([EmployeeId]),
)
