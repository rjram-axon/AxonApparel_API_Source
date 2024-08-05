CREATE TABLE [dbo].[Process]
(
	[ProcessId] [int] IDENTITY(1,1) NOT NULL,
	[Process] [varchar](40) NOT NULL,
	[Description] [varchar](120) NULL,
	[Stage_Schedule] [tinyint] NULL,
	[IsProportion] [bit] NULL,
	[IsComponentProcess] [bit] Default(0) NOT NULL,
	[AllowLotNumGen] [bit] Default(0)NOT NULL,
	[IsValidateProcessOrdQty] [bit] Default(0)NOT NULL,
	[IsActive] [bit] Default(1) NOT NULL,
	[SeqNo] [int] Default(null) NULL,
	[Prc_Allowance] [numeric](19, 3) NULL, 
	Program_input varchar(2) null,
	Program_output varchar(2) null,
	GSTTaxCode varchar(50) Null,
	IGSTTaxCode varchar(50) Null,
    [ProcessLoss] NUMERIC(15, 3) NULL, 
    CONSTRAINT [PK_Process] PRIMARY KEY ([ProcessId])
)
