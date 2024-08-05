CREATE TABLE [dbo].[ProcessSeq_Mas]
(
	[Proc_seq_masid] [int] IDENTITY(1,1) NOT NULL primary key,
	[Job_ord_no] [varchar](20) NULL,
	
	[OrderType] [varchar](1) NOT NULL,
	
	[EntryDate] [datetime] NOT NULL,
	[CreatedBy] [int] NULL,
	
	
	
	CONSTRAINT [FK_ProcessSeq_mas] FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[Employee] ([EmployeeId]),
	CONSTRAINT [ck_processseq_ordertype] CHECK  (([OrderType] = 'J' or [OrderType] = 'W' or [OrderType] = 'S')),
	
	
	
	)
