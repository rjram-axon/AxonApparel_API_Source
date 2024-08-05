CREATE TABLE [dbo].[ScheduleMas]
(
	[SchMasID] INT IDENTITY(1,1) NOT NULL,
	[SchType] [char](1) NULL,
	[OrderNo] [varchar](15) NOT NULL,
	[StyleID] [int] NULL,
	[CompanyID] [int] NOT NULL,
	[CreateUserID] [int] NOT NULL,
	[EntryDate] [datetime] NULL,
	[ReSchedule] [char](1) NOT NULL Default('N'),
	[Initiaion] [datetime] NOT NULL,
	[DespDate] [datetime] NOT NULL,
	[max_despdate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[Taschtype] [varchar](15) NULL,
	CONSTRAINT [PK_ScheduleMasRefRecid] PRIMARY KEY ([SchMasID]),
	CONSTRAINT [ScheduleMas_Refcompanyid] FOREIGN KEY ([CompanyID]) REFERENCES [Company]([companyid]),
	CONSTRAINT [ScheduleMas_Refcreatedby] FOREIGN KEY ([CreatedBy]) REFERENCES [Employee]([EmployeeId]),
	CONSTRAINT [ScheduleMas_Refstyleid] FOREIGN KEY ([StyleID]) REFERENCES StyleHeader(StyleId),
	--CONSTRAINT [ScheduleMaster_Refuserid] FOREIGN KEY ([CreateUserID]) REFERENCES UserName(StyleId),
	CONSTRAINT [ScheduleMas_Refscheduletype] CHECK  ([schtype] = 'A' or [schtype]='P' or [schtype]='W')
)
