package com.itf.was.service;

import com.itf.was.mapper.SampleMapper;
import com.itf.was.common.util.ObjectCheck;
import com.itf.was.model.domain.Sample;
import com.itf.was.model.dto.SampleDto;
import com.itf.was.model.enums.ResultStatus;
import com.itf.was.model.vo.Result;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service("sampleService")
public class SampleService {

	private static final Logger LOGGER = LoggerFactory.getLogger( SampleService.class );
	private final SampleMapper sampleMapper;

	/**** SERVICE.CREATE ****/

	public Sample insertMono( SampleDto sampleDto ) {
		return sampleMapper.insertMono( sampleDto ) > 0 ? sampleMapper.selectMono( sampleDto ) : null;
	}

	/**** SERVICE.READ ****/

	public List<Sample> selectAll( SampleDto sampleDto ) { return sampleMapper.selectAll( sampleDto ); }

	public List<Sample> selectFlux( SampleDto sampleDto ) { return sampleMapper.selectFlux( sampleDto ); }

	public Sample selectMono( SampleDto sampleDto ) {
		return sampleMapper.selectMono( sampleDto );
	}

	public int count( SampleDto sampleDto ) {
		return sampleMapper.count( sampleDto );
	}

	/**** SERVICE.UPDATE ****/

	public int updateMono( SampleDto sampleDto ) {
		return sampleMapper.updateMono( sampleDto );
	}

	/**** SERVICE.DELETE ****/

	public int deleteMono( SampleDto sampleDto ) {
		return sampleMapper.deleteMono( sampleDto );
	}

	/**** HANDLER.CREATE ****/

	public Result insertMonoHandler( SampleDto sampleDto ) {
		Map<String, Object> data = new HashMap<String, Object>();

		if ( ObjectCheck.empty( sampleDto ) ) {
			return Result.builder().data( data ).status( ResultStatus.INVALID_INPUT_VALUE ).build();
		}

		/** BUSINESS **/
		data.put( "mono", this.insertMono( sampleDto ) );

		/** RETURN **/
		return Result.builder().data( data ).status( ResultStatus.SUCCESS ).build();
	}

	/**** HANDLER.READ ****/
	public Result selectAllHandler( SampleDto sampleDto ) {
		Map<String, Object> data = new HashMap<String, Object>();

		/** BUSINESS **/
		data.put( "flux", this.selectAll( sampleDto ) );

		/** RETURN **/
		return Result.builder().data( data ).status( ResultStatus.SUCCESS ).build();
	}

	public Result selectFluxHandler( SampleDto sampleDto ) {
		Map<String, Object> data = new HashMap<String, Object>();

		/** BUSINESS **/
		data.put( "flux", this.selectAll( sampleDto ) );

		/** RETURN **/
		return Result.builder().data( data ).status( ResultStatus.SUCCESS ).build();
	}

	public Result countHandler( SampleDto sampleDto ) {
		Map<String, Object> data = new HashMap<String, Object>();

		/** BUSINESS **/
		data.put( "count", this.count( sampleDto ) );

		/** RETURN **/
		return Result.builder().data( data ).status( ResultStatus.SUCCESS ).build();
	}

	public Result selectMonoHandler( long idx ) {
		Map<String, Object> data = new HashMap<String, Object>();

		if ( ObjectCheck.empty( idx ) ) {
			return Result.builder().status( ResultStatus.INVALID_INPUT_VALUE ).build();
		}

		/** BUSINESS **/
		data.put( "mono", this.selectMono( SampleDto.builder().idx( idx ).build() ) );

		/** RETURN **/
		return Result.builder().data( data ).status( ResultStatus.SUCCESS ).build();
	}

	/**** HANDLER.UPDATE ****/

	public Result updateMonoHandler( long idx, SampleDto sampleDto ) {
		Map<String, Object> data = new HashMap<String, Object>();

		if ( ObjectCheck.empty( idx ) || ObjectCheck.empty( sampleDto ) ) {
			return Result.builder().status( ResultStatus.INVALID_INPUT_VALUE ).build();
		}

		/** BUSINESS **/
		sampleDto.setIdx( idx );
		data.put( "mono", this.updateMono( sampleDto ) );

		/** RETURN **/
		return Result.builder().data( data ).status( ResultStatus.SUCCESS ).build();
	}

	/**** HANDLER.DELETE ****/

	public Result deleteMonoHandler( long idx ) {
		Map<String, Object> data = new HashMap<String, Object>();

		if ( ObjectCheck.empty( idx ) ) {
			return Result.builder().status( ResultStatus.INVALID_INPUT_VALUE ).build();
		}

		/** BUSINESS **/
		data.put( "mono", this.deleteMono( SampleDto.builder().idx( idx ).build() ) );

		/** RETURN **/
		return Result.builder().data( data ).status( ResultStatus.SUCCESS ).build();
	}

}
