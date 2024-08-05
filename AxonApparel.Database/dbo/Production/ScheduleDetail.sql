﻿CREATE TABLE [dbo].[ScheduleDetail]
(
	[SchDetID] INT IDENTITY(1,1) NOT NULL,
	[SchMasId] [int] NOT NULL,
	[ParticularID] [int] NOT NULL,
	[Quantity] [numeric](14, 3) NOT NULL Default(0),
	[UOMID] [int] NULL,
	[LeadDays] [int] NOT NULL,
	[ShipDays] [int] NOT NULL,
	[ProcessorID] [int] NULL Default(0),
	[DesUpd] [char](1) NOT NULL Default('N'),
	[StatusUpd] [char](1) NOT NULL Default('N'),
	[Closure] [char](1) NOT NULL Default('N'),
	[ClosureDt] [datetime] NULL,
	[ProcessorType] [char](1) NULL,
	[JobOrdNo] [varchar](15) NULL,
	[TaskOwnerID] [int] NOT NULL,
	[StartDt] [datetime] NULL,
	[EndDt] [datetime] NULL,
	[ordertype] [char](1) NULL,
	[ActualStartDt] [datetime] NULL,
	[ActualEndDt] [datetime] NULL,
	[remainderid] [int] NULL,
	[MailStatus] [char](1) NOT NULL Default('N'),
	[SMSStatus] [char](1) NOT NULL Default('N'),
	[colorid] [int] NULL,
	CONSTRAINT [PK_ScheduleDetRefRecid] PRIMARY KEY ([SchDetID]),
	CONSTRAINT [ScheduleDetail_RefColorid] FOREIGN KEY ([colorid]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [ScheduleDet_RefMasid] FOREIGN KEY ([SchMasId]) REFERENCES [ScheduleMas]([SchMasID]),
	CONSTRAINT [ScheduleDet_Refemployeeid] FOREIGN KEY ([TaskOwnerID]) REFERENCES Employee([EmployeeId]),
	CONSTRAINT [ScheduleDet_RefUOMid] FOREIGN KEY ([UOMID]) REFERENCES [Unit_of_measurement]([uomid]),
	CONSTRAINT [fk_scheduledetail_remainderid] FOREIGN KEY ([remainderid]) REFERENCES [Popup_Remainder_Mas]([RemainderId]),
	CONSTRAINT [Ck_Component_Refordertype] CHECK  ([ordertype] = 'B' or [ordertype]='S')
)
