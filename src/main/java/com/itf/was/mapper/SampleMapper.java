package com.itf.was.mapper;

import com.itf.was.model.domain.Sample;
import com.itf.was.model.dto.SampleDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SampleMapper {

	/**** CREATE ****/

	int insertMono( SampleDto sampleDto );

	/**** READ ****/

	List<Sample> selectAll( SampleDto sampleDto );

	List<Sample> selectFlux( SampleDto sampleDto );

	Sample selectMono( SampleDto sampleDto );

	int count( SampleDto sampleDto );

	/**** UPDATE ****/

	int updateMono( SampleDto sampleDto );

	/**** DELETE ****/

	int deleteMono( SampleDto sampleDto );

}
