CREATE TABLE [dbo].[ProcessSeq_Mas_Amend]
(
	[AmdProc_seq_masid] [int] IDENTITY(1,1) NOT NULL primary key,
	[Job_ord_no] [varchar](20) NULL,	
	[OrderType] [varchar](1) NOT NULL,	
	[EntryDate] [datetime] NOT NULL,	
	[CreatedBy] [int] NULL,	
	CONSTRAINT [FK_ProcessSeq_masAmend] FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[Employee] ([EmployeeId]),
	CONSTRAINT [ck_processseq_ordertypeAmend] CHECK  (([OrderType] = 'J' or [OrderType] = 'W' or [OrderType] = 'S')),
)
