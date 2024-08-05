CREATE TABLE [dbo].[Process_QuotePro]
(
	[Process_QuoteProid] [int] IDENTITY(1,1) NOT NULL,
    [Process_Quoteid] [int] NULL,
	[Processid] [int] NULL,
	[Job_ord_no] [varchar](20) NULL DEFAULT (''), 
	[JobMasId][int] null,
	[PsNo][int]null,
    CONSTRAINT [PK_Process_QuotePro] PRIMARY KEY ([Process_QuoteProid]), 
    CONSTRAINT [FK_Process_QuotePro_Process_Quote] FOREIGN KEY ([Process_Quoteid]) REFERENCES [Process_Quote]([Process_Quoteid]),
	CONSTRAINT [FK_Process_QuotePro_Process] FOREIGN KEY ([Processid]) REFERENCES [Process]([ProcessId]),
	CONSTRAINT [FK_Process_QuotePro_Job_ord_mas] FOREIGN KEY ([JobMasId]) REFERENCES [Job_ord_mas]([Id])
)
