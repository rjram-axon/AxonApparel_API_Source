CREATE TABLE [dbo].[ScheduleStatus]
(
	[SchStatusID] INT IDENTITY(1,1) NOT NULL,
	[SchMasID] [int] NOT NULL,
	[SchDetId] [int] NOT NULL,
	[EntryDate] [datetime] NULL,
	[userId] [int] NOT NULL,
	[SchDesc] [varchar](2000) NULL,
	[StatusOrClosure] [char](1) NULL,
	[UpadteForID] [int] NOT NULL,
	[title] [varchar](100) NULL,
	[Result] [varchar](10) NOT NULL Default(''),
	CONSTRAINT [PK_ScheduleStatusRefRecid] PRIMARY KEY ([SchStatusID]),
	CONSTRAINT [ScheduleStatus_RefSchedulemasid] FOREIGN KEY ([SchMasID]) REFERENCES [ScheduleMas]([SchMasID]),
	CONSTRAINT [ScheduleStatus_RefEmployeeid] FOREIGN KEY ([UpadteForID]) REFERENCES [Employee]([EmployeeId])
	--CONSTRAINT [ScheduleStatus_RefEmployeeid] FOREIGN KEY ([userId]) REFERENCES UserName(UserId),
)
